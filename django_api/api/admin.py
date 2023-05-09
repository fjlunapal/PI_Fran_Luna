from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Producto, User, Carrito, Pedido, Comentario, Valoracion

class UserAdmin(BaseUserAdmin):
    model = User
    add_fieldsets = [
        ('user', {
           'fields': [
               'email', 'password'
    ]})
    ]
    fieldsets = [
        ('user', {
           'fields': [
               'email', 'password', 'is_staff', 'is_superuser'
    ]})
    ]
    search_fields = ['email']
    list_display = ['email']
    list_filter = ['is_staff', 'is_admin', 'is_superuser']
    ordering = ['email']

admin.site.register(Producto)
admin.site.register(Carrito)
admin.site.register(Pedido)
admin.site.register(Comentario)
admin.site.register(Valoracion)
admin.site.register(User, UserAdmin)

