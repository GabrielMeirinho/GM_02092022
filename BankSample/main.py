import csv
import os
from tempfile import NamedTemporaryFile
from fastapi import FastAPI, HTTPException, File, UploadFile
from Utils import Utils


# Define an API object
app = FastAPI()


# Define your list
accList = []


# Map HTTP method and path to python function
@app.get("/")
async def root():
    return {"message": "Hello World. Welcome to the API home page!"}


@app.get("/account", status_code=200)
async def get_accounts_list() -> dict:
    """Gets the whole accounts list
    Returns:
        Dictionary containing the list of items under the key "data"
    """
    return {"data": Utils.parsecarnumberlist(4, accList)}


@app.post("/account/file", status_code=201)
async def post_account(file: UploadFile = File(...)):
    """Gets the whole accounts list from a csv file and push to the system
    Returns:
        Dictionary of lines containing the items under the key "data"
    Raises:
        HTTPException 400, if the element is already present on the list
    """
    data = {}
    temp = NamedTemporaryFile(delete=False)
    try:
        try:
            contents = file.file.read()
            with temp as f:
                f.write(contents);
        except Exception:
            return {"message": "There was an error uploading the file"}
        finally:
            file.file.close()

        with open(temp.name,'r', encoding='utf-8') as csvf:
            csvReader = csv.DictReader(csvf)
            for rows in csvReader:
                dupe = 0
                for temp_item in accList:
                    # prevent duplicated accounts
                    if temp_item['bankname'] == rows['bankname'] and temp_item['cardnumber'] == rows['cardnumber']:
                        dupe = 1
                if dupe == 0:
                    key = rows['cardnumber']  # Assuming a column named 'Id' to be the primary key
                    data[key] = rows
                    accList.append(rows)
    except Exception:
        raise HTTPException(status_code=400, detail=f"The file has corrupted fields!")
    finally:
        # temp.close()  # the `with` statement above takes care of closing the file
        os.remove(temp.name)  # Delete the file

    return {"data": f"File processed added correctly!"}


@app.post("/account", status_code=201)
async def post_account(acc: dict) -> dict:
    """Creates a new account
    Args:
        acc (dict): {"bankname" : (str), "cardnumber" : (str), "expiredate" : (date)}
    Returns:
        notification, code 201
    Raises:
        HTTPException 400, if the element is already present on the list
    """
    for temp_item in accList:
        if temp_item['bankname'] == acc['bankname'] and temp_item['cardnumber'] == acc['cardnumber']:
            raise HTTPException(status_code=400, detail=f"{acc['account']} already present!")
    accList.append(acc)
    return {"data": f"{acc['cardnumber']} added correctly!"}


@app.get("/account/{index}", status_code=200)
async def get_account_by_bank_name(index: int):
    """Gets the index from accounts list
    Returns:
        Object data , code 200
    Raises:
        HTTPException 400, if the index doesn't exist
    """
    if index > len(accList)-1:
        raise HTTPException(status_code=400, detail=f"Index does not exists")
    return {"data": accList[index]}


# Start the API application (on command line)
# !uvicorn main:app --reload
