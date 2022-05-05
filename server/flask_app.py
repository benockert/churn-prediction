from flask import Flask, jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS

import boto3
import numpy
import pandas as pd
from sklearn.preprocessing import StandardScaler
import pickle
import json

app = Flask(__name__)
CORS(app)


@app.route('/title', methods=['GET'])
def get_project_title():
    output = {}
    output['data'] = str('FINA 4390 Final Project - Group 3')
    return jsonify(output)


@app.route('/names', methods=['GET'])
def get_names():
    output = {}
    output['data'] = str(
        'Ben Ockert, James Schaefer, Henry Mouawad, Jeremy Koch')
    return jsonify(output)


@app.route('/model_vars', methods=['GET'])
def get_model_vars():
    output = {}
    output[0] = {'variable': 'Total_Trans_Amt', 'type': 'free_currency_entry', 'name': 'Total Transaction Amount',
                 'help': 'Total value of transactions made by a customer over the year.', 'value': 0.00}
    output[1] = {'variable': 'Total_Trans_Ct', 'type': 'free_number_entry', 'name': 'Total Transaction Count',
                 'help': 'Total count of transactions made by a customer over the year.', 'value': 0}
    output[2] = {'variable': 'Total_Revolving_Bal', 'type': 'free_currency_entry', 'name': 'Total Revolving Balance',
                 'help': 'Total outstanding balance of a customer\'s revolving credit card account.', 'value': 0.00}
    output[3] = {'variable': 'Credit_Limit', 'type': 'free_currency_entry',
                 'name': 'Credit Limit', 'help': 'A customer\'s credit card limit.', 'value': 0.00}
    output[4] = {'variable': 'Contacts_Count_12_mon', 'type': 'discrete_range', 'min': 0, 'max': 7, 'name': 'Total Contacts',
                 'help': 'Number of contacts made by the bank with the customer over the last 12 months.', 'value': 0}
    output[5] = {'variable': 'Total_Relationship_Count ', 'type': 'discrete_range', 'min': 1, 'max': 7,
                 'name': 'Number of Products', 'help': 'Number of bank products held by the customer.', 'value': 0}
    output[6] = {'variable': 'Months_Inactive_12_mon', 'type': 'discrete_range', 'min': 0, 'max': 13,
                 'name': 'Months Inactive', 'help': 'The number of months a user has been inactive over the last 12 months.', 'value': 0}
    output[7] = {'variable': 'Avg_Utilization_Ratio', 'type': 'continuous_range', 'min': 0, 'max': 1,
                 'name': 'Average Utilization Ratio', 'help': 'Average credit card limit utilization (sum of balances / sum of limits).', 'value': 0}
    output[8] = {'variable': 'Total_Ct_Chng_Q4_Q1', 'type': 'percentage', 'name': 'Change In Transaction Count',
                 'help': 'Percentage change in customer transaction COUNT between Q1 and Q4.', 'value': 0.00}
    output[9] = {'variable': 'Total_Amt_Chng_Q4_Q1', 'type': 'percentage', 'name': 'Change In Transaction Amount',
                 'help': 'Percentage change in customer transaction AMOUNT between Q1 and Q4.', 'value': 0.00}
    return jsonify(output)


@app.route('/xgb', methods=['GET'])
def xg_boost():
    # capture inputs
    parser = reqparse.RequestParser()
    parser.add_argument("Total_Trans_Amt")
    parser.add_argument("Total_Revolving_Bal")
    parser.add_argument("Credit_Limit")
    parser.add_argument("Total_Trans_Ct")
    parser.add_argument("Contacts_Count_12_mon")
    parser.add_argument("Total_Relationship_Count")
    parser.add_argument("Months_Inactive_12_mon")
    parser.add_argument("Avg_Utilization_Ratio")
    parser.add_argument("Total_Ct_Chng_Q4_Q1")
    parser.add_argument("Total_Amt_Chng_Q4_Q1")

    args = parser.parse_args()

    # Unpack XG Boost model and scaler
    model_filename = '/home/benOckertanywhere/finalproject/xgboost_model.model'
    scaler_filename = '/home/benOckertanywhere/finalproject/scaler.scl'

    loaded_scaler = pickle.load(open(scaler_filename, 'rb'))
    loaded_model = pickle.load(open(model_filename, 'rb'))

    df_new = [[
        args["Total_Trans_Amt"],
        args["Total_Revolving_Bal"],
        args["Credit_Limit"],
        args["Total_Trans_Ct"],
        args["Contacts_Count_12_mon"],
        args["Total_Relationship_Count"],
        args["Months_Inactive_12_mon"],
        args["Avg_Utilization_Ratio"],
        args["Total_Ct_Chng_Q4_Q1"],
        args["Total_Amt_Chng_Q4_Q1"]
    ]]

    X_test_scaled_new = pd.DataFrame(loaded_scaler.transform(df_new))

    predicted = loaded_model.predict(X_test_scaled_new)
    predicted_class = int(predicted[0])

    output = {}
    output['class'] = predicted_class

    if predicted_class == 1:
        output['text'] = "This customer shows signs of churn. Consider simplifying payment processes or provide extra cash back for large transactions to increase the total number of transations and total transaction spend amount. Also, consider marketing savings and new app features to increase user engagement and reduce the number of months and user is inactive."
    if predicted_class == 0:
        output['text'] = "This customer does not show any signs of churn."

    return jsonify(output)
