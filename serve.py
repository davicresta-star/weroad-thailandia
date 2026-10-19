"""Server di sviluppo per weroad-thailandia.

Come http.server, ma con Cache-Control: no-store su ogni risposta:
il browser riscarica sempre l'ultima versione delle pagine.
"""
import http.server
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 8743


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):
        print(self.address_string(), fmt % args)


if __name__ == "__main__":
    print(f"weroad-thailandia su http://localhost:{PORT} (cache disattivata)")
    http.server.ThreadingHTTPServer(("", PORT), NoCacheHandler).serve_forever()
