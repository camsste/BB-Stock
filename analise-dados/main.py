from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import joblib

# Carregar o modelo e metadados
modelo = joblib.load('modelo_reposicao.pkl')
with open('features.txt', 'r') as f:
    modelo_metadados = [line.strip() for line in f.readlines()]

app = Flask(__name__)

# Função para preparar a entrada
def preparar_dados(dados):
    # Carrega os dados em um DataFrame
    df = pd.DataFrame([dados])

    # 1) Conversão numérica onde couber
    obj_cols = {'codigo','abc','img_url','descricao'}
    for c in df.columns:
        if c not in obj_cols:
            df[c] = pd.to_numeric(df[c].astype(str).str.replace(',','.'), errors='coerce')

    # 2) Garante colunas-base mínimas (caso o CSV tenha vindo sem alguma)
    colunas_base = [
        'saldo_manut','provid_compras','recebimento_esperado','transito_manut',
        'stage_manut','recepcao_manut','pendente_ri','pecas_teste','pecas_teste_kit',
        'fornecedor_reparo','laboratorio','wr','wrcr','stage_wr','tipo','cmm','coef_perda','abc'
    ]
    for col in colunas_base:
        if col not in df.columns:
            df[col] = 0

    # 3) Recria as mesmas features derivadas do treino (essencial)
    cols_boas = ['saldo_manut','provid_compras','recebimento_esperado','transito_manut','stage_manut','recepcao_manut','pendente_ri']
    df['saldo_boas'] = df[cols_boas].fillna(0).sum(axis=1)

    cols_teste = ['pecas_teste','pecas_teste_kit']
    df['saldo_teste'] = df[cols_teste].fillna(0).sum(axis=1)

    cols_reparo = ['fornecedor_reparo','laboratorio','wr','wrcr','stage_wr']
    recuperacao_perc = (1 - df['coef_perda'].fillna(0).clip(0,1))
    df['saldo_reparo_recuperavel'] = df[cols_reparo].fillna(0).sum(axis=1) * recuperacao_perc

    df['saldo_total'] = np.where(
        df['tipo'].isin([10,19]),
        df['saldo_boas'] + df['saldo_teste'] + df['saldo_reparo_recuperavel'],
        df['saldo_boas']
    )

    def calc_es(row):
        cmm = row.get('cmm', 0.0) or 0.0
        abc = str(row.get('abc','')).strip().upper()
        tipo = int(row.get('tipo', 20) or 20)
        if abc == 'A' and tipo in (10,19):
            return 4*cmm
        if abc == 'A' and tipo == 20:
            return 1.5*cmm
        if abc in ('B','C') and tipo in (10,19):
            return 5*cmm
        if abc in ('B','C') and tipo == 20:
            return 2.5*cmm
        return 3*cmm

    df['ES'] = df.apply(calc_es, axis=1)

    cmm = df['cmm'].fillna(0)
    coef_perda = df['coef_perda'].fillna(0).clip(0,1)
    df['FA'] = np.where(
        df['tipo'].isin([10,19]),
        df['ES'] + 4*cmm*coef_perda,
        df['ES'] + 4*cmm
    )

    df['QA_real'] = (df['FA'] - df['saldo_total']).clip(lower=0)

    df['backlog_total'] = df[['pendente_ri','recepcao_manut','transito_manut','wr','wrcr','stage_wr']].fillna(0).sum(axis=1)
    df['taxa_backlog'] = df['backlog_total'] / (df['saldo_total'] + 1)
    df['razao_saldo_cmm'] = df['saldo_total'] / (df['cmm'] + 0.01)
    df['razao_provid_cmm'] = df['provid_compras'] / (df['cmm'] + 0.01)
    df['item_critico'] = (df['cmm'] > df['cmm'].quantile(0.75)).astype(int)
    df['alto_risco_perda'] = (df['coef_perda'] >= 0.5).astype(int)
    df['abc_encoded'] = df['abc'].map({'A':3, 'B':2, 'C':1}).fillna(1)
    df['estoque_pct'] = (df['saldo_total'] / (df['FA'] + 0.01)) * 100
    df['cobertura_dias'] = (df['saldo_total'] / (df['cmm'] + 0.01)) * 30

    # 4) Prepara X exatamente com as features do treino
    for feat in modelo_metadados:
        if feat not in df.columns:
            df[feat] = 0

    X = df[modelo_metadados].copy().fillna(0)
    
    return X

@app.route('/predicao', methods=['POST'])
def predicao():
    try:
        # Recebe dados do cliente
        dados = request.get_json()
        
        # Prepara os dados para o modelo
        X = preparar_dados(dados)
        
        # Realiza a previsão
        qa_previsto = modelo.predict(X).clip(min=0)[0]

        # Retorna a previsão
        return jsonify({'QA_previsto': qa_previsto})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@app.route('/')
def not_found():
    return "Resource not found.", 404

if __name__ == '__main__':
    app.run(debug=True)
