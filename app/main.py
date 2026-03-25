from fastapi import FastAPI
from transformers import pipeline

app = FastAPI()

# 모델 로드 (서버 시작할 때 한 번만)
classifier = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

@app.get("/")
def health_check():
    return {"status": "ok"}

@app.post("/predict")
def predict(text: str):
    result = classifier(text)
    return {"result": result}
