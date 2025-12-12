from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse, Http404, FileResponse
from pathlib import Path
import mimetypes

urlpatterns = [
    path('admin/', admin.site.urls),
    # Keep Django app routes under /app/ to avoid colliding with SPA
    path('app/', include('portal.urls')),
    path('api/', include('portal.api_urls')),
]

def spa_index_view(request):
    index_path = Path(settings.FRONTEND_DIST_DIR) / 'index.html'
    if not index_path.exists():
        return HttpResponse("Build not found. Run 'npm run build' to generate the frontend.", status=500)
    content = index_path.read_text(encoding='utf-8', errors='ignore')
    return HttpResponse(content)

# Serve SPA assets produced by Vite (e.g., /assets/index-*.js, css, images)
def spa_asset_serve(request, path):
    # All built assets live under build/assets
    file_path = Path(settings.FRONTEND_DIST_DIR) / 'assets' / path
    if not file_path.exists() or not file_path.is_file():
        raise Http404()
    content_type, _ = mimetypes.guess_type(str(file_path))
    return FileResponse(open(file_path, 'rb'), content_type=content_type or 'application/octet-stream')

# Assets (JS/CSS/images) from Vite build
urlpatterns += [
    re_path(r'^assets/(?P<path>.*)$', spa_asset_serve),
]

# Catch-all routes to the SPA index (root and any non-API path)
urlpatterns += [
    re_path(r'^(?!app/|admin/|static/|assets/).*$', spa_index_view),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)



