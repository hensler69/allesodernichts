import os
# Favicon: dick umrandete Gurkenscheibe auf Limette, passend zum Neo-Brutalism-Look
OUT = os.path.join(os.environ.get("SHOP_ZIEL", "./shop/"), "assets/")
kerne = "".join(f'<ellipse cx="32" cy="22.5" rx="2.2" ry="3.6" fill="#43d36b" stroke="#121212" stroke-width="1.5" transform="rotate({w} 32 32)"/>' for w in range(0, 360, 60))
fav = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#dff3a6"/>'
       '<circle cx="32" cy="32" r="25" fill="#43d36b" stroke="#121212" stroke-width="5"/><circle cx="32" cy="32" r="18" fill="#fffef6" stroke="#121212" stroke-width="3.5"/>'
       f'<circle cx="32" cy="32" r="7" fill="#dff3a6" stroke="#121212" stroke-width="3"/>{kerne}</svg>')
open(OUT + "favicon.svg", "w").write(fav)
print("favicon.svg")
