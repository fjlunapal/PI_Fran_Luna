from django.contrib import admin
from .models import Producto, Carrito, Pedido, Comentario, Valoracion

admin.site.register(Producto)
admin.site.register(Carrito)
admin.site.register(Pedido)
admin.site.register(Comentario)
admin.site.register(Valoracion)
