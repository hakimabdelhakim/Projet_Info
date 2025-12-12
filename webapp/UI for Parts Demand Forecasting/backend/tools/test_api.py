import os
import sys, django
from django.test import Client

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ocp_portal.settings')
os.chdir(BASE_DIR)
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)
django.setup()

c = Client()

def check(path, method='get', data=None, expect_status=200):
    func = getattr(c, method)
    resp = func(path, data=data or {})
    print(path, resp.status_code, resp.content[:120])
    assert resp.status_code == expect_status, (path, resp.status_code)


check('/api/health')

# Demo login and cookie handling
r = c.post('/api/login', data={
    'usernameOrEmail': 'manager',
    'password': 'demo',
}, content_type='application/json')
print('/api/login', r.status_code)
assert r.status_code == 200

# Budget endpoints should be allowed for manager
check('/api/budget')
check('/api/alerts')

print('OK')
