from shop.models import *

from rest_framework import serializers
from django.contrib.auth import password_validation, authenticate
from rest_framework import serializers
from rest_framework.authtoken.models import Token

# Login de usuarios
class UserModelSerializer(serializers.ModelSerializer):

    class Meta:

        model = User
        fields = (
            'username',
        )

class UserLoginSerializer(serializers.Serializer):

    # Campos que vamos a requerir
    username = serializers.CharField()
    password = serializers.CharField(min_length=8, max_length=64)

    # Primero validamos los datos
    def validate(self, data):

        # authenticate recibe las credenciales, si son válidas devuelve el objeto del usuario
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError('Las credenciales no son válidas')

        # Guardamos el usuario en el contexto para posteriormente en create recuperar el token
        self.context['user'] = user
        return data

    def create(self, data):
        """Generar o recuperar token."""
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key

# Serializers 

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class CarritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrito
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'

class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = '__all__'

class ValoracionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Valoracion
        fields = '__all__'