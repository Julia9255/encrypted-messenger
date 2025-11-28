import uvicorn
from fastapi import FastAPI, WebSocket
from fastapi.staticfiles import StaticFiles

app = FastAPI()
clients = []

@app.websocket("/ws")
async def ws_handler(ws: WebSocket):
    await ws.accept()
    clients.append(ws)
    try:
        while True:
            msg = await ws.receive_text()
            for client in clients:
                await client.send_text(msg)
    except:
        clients.remove(ws)

app.mount("/", StaticFiles(directory="public", html=True), name="static")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
