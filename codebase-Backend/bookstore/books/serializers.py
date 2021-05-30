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
        exclude = ['password']


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


class BooksPostSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True, required=True)

    class Meta:
        model = Books
        exclude = ['created_by', 'last_modified_by']


class BooksResponseSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True, required=True)

    class Meta:
        model = Books
        fields = '__all__'
        depth = 1


class UserProfileResponseSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True)
    user = UserListSerializer(many=False)

    class Meta:
        model = UserProfile
        fields = '__all__'
        depth = 1


class UserProfilePostSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True)

    class Meta:
        model = UserProfile
        fields = '__all__'

    def update(self, instance, validated_data):
        if 'addresses' in validated_data.keys():
            addresses = validated_data.pop('addresses')
            for item in addresses:
                print("item  ", item)
                address = Address.objects.create(**item)
                instance.addresses.add(address)
        if 'phone_number' in validated_data.keys():
            instance.phone_number = validated_data.get('phone_number')
        instance.save()
        return instance


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'


class OrderPostSerializer(serializers.ModelSerializer):
    books = CartSerializer(many=True)

    class Meta:
        model = Order
        exclude = ['user']

    def create(self, validated_data):
        books = validated_data['books']
        username = self.context['request'].user
        user = User.objects.filter(username=username).first()
        order = Order.objects.create(amount=validated_data.get('amount'),
                                     payment_mode=validated_data.get('payment_mode'),
                                     address=validated_data.get('address'),
                                     user=user)
        for item in books:
            book = Cart.objects.create(**item)
            order.books.add(book)
        return validated_data

    def update(self, instance, validated_data):
        keys = validated_data.keys()
        if 'books' in keys or 'amount' in keys() or 'address' in keys or 'payment_mode' in keys or 'date' in keys:
            raise serializers.ValidationError({"message": "Cannot update these data"})
        else:
            instance.status = validated_data.get('status')
            instance.save()
        return instance


class OrderResponseSerializer(serializers.ModelSerializer):
    books = CartSerializer(many=True)
    user = UserListSerializer(many=False)

    class Meta:
        model = Order
        fields = '__all__'
        depth = 1
