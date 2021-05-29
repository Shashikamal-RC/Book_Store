from rest_framework import serializers
from django.contrib.auth.models import User, BaseUserManager
from django.contrib.auth import password_validation
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Books, Authors, UserProfile, Address, Cart, Order, Publishers


class UserRegisterSerializer(serializers.ModelSerializer):
    """
    A User serializer for registering the user
    """
    phone_number = serializers.IntegerField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password', 'phone_number']

    def validate_email(self, value):
        user = User.objects.filter(email=value)
        if user:
            raise serializers.ValidationError("Email already exists")
        return BaseUserManager.normalize_email(value)

    def validate_password(self, value):
        password_validation.validate_password(value)
        return value


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # add custom fields
        token['username']: user.username
        return token


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ChangePasswordSerializer(serializers.ModelSerializer):
    current_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ['current_password', 'new_password']

    def validate_current_password(self, value):
        if not self.context['request'].user.check_password(value):
            raise serializers.ValidationError("Please enter a valid current password")
        return value

    def validate_new_password(self, value):
        password_validation.validate_password(value)
        return value


class AuthorsResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Authors
        fields = '__all__'


class AuthorsPostSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(max_length=None, use_url=True, required=True)

    class Meta:
        model = Authors
        exclude = ['created_by', 'last_modified_by']


class PublisherResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publishers
        fields = '__all__'
        depth = 1


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class PublisherPostSerializer(serializers.ModelSerializer):
    address = AddressSerializer(many=False)

    class Meta:
        model = Publishers
        fields = '__all__'

    def create(self, validated_data):
        address_data = validated_data['address']
        address_obj = Address.objects.create(**address_data)

        if address_obj:
            Publishers.objects.create(name=validated_data.get('name'),
                                      phone_number=validated_data.get('phone_number'),
                                      address=address_obj)
        return validated_data


class BooksSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True, required=True)

    class Meta:
        model = Books
        exclude = ['created_by', 'last_modified_by']
        depth = 1


class UserProfileSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True)

    class Meta:
        model = UserProfile
        fields = '__all__'
        depth = 1


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    books = CartSerializer(many=True)

    class Meta:
        model = Order
        fields = '__all__'
