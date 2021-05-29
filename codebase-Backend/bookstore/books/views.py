from rest_framework import generics, status, permissions
from .serializers import UserRegisterSerializer, MyTokenObtainPairSerializer, ChangePasswordSerializer, \
    BooksPostSerializer, BooksResponseSerializer, AuthorsPostSerializer, AuthorsResponseSerializer, \
    UserProfileSerializer, OrderSerializer, PublisherPostSerializer, PublisherResponseSerializer, AddressSerializer
from .utils import create_user_account
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import logout
from .models import Books, Authors, UserProfile, Order, Publishers, Address
from django.contrib.auth.models import User
from django.core.exceptions import PermissionDenied


class UserRegisterViewSet(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone_number = serializer.validated_data.pop('phone_number')
        user = create_user_account(**serializer.validated_data)
        user_profile = UserProfile.objects.create(phone_number=phone_number, user=user)
        data = UserProfileSerializer(user_profile).data
        return Response(data=data, status=status.HTTP_201_CREATED)


class TokenViewSet(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class ChangePasswordViewSet(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        request.user.set_password(serializer.validated_data['new_password'])
        request.user.save()
        data = {"success": "Password updated successfully."}
        return Response(data=data, status=status.HTTP_200_OK)


class LogoutViewSet(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        logout(request)
        data = {"success": "Successfully logged out"}
        return Response(data=data, status=status.HTTP_200_OK)


class BookListViewSet(generics.ListCreateAPIView):
    queryset = Books.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BooksPostSerializer
        else:
            return BooksResponseSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class BookDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Books.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BooksPostSerializer
        else:
            return BooksResponseSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class AuthorListViewSet(generics.ListCreateAPIView):
    queryset = Authors.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AuthorsPostSerializer
        else:
            return AuthorsResponseSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        print(self.request.data, "data")
        return self.create(request, *args, **kwargs)


class AuthorDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Authors.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'PUT' or self.request.method == 'PATCH':
            return AuthorsPostSerializer
        else:
            return AuthorsResponseSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class PublisherListViewSet(generics.ListCreateAPIView):
    queryset = Publishers.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return PublisherPostSerializer
        else:
            return PublisherResponseSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        print(self.request.data, "data")
        return self.create(request, *args, **kwargs)


class PublisherDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Publishers.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'PUT' or self.request.method == 'PATCH':
            return PublisherPostSerializer
        else:
            return PublisherResponseSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class UserProfileListViewSet(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class UserProfileDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class OrderListViewSet(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class OrderDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class AddressDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AddressSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        user_id = self.kwargs.get('user')
        user = User.objects.filter(username=self.request.user).first()
        print("user : ", int(user_id), type(user.id))
        if int(user_id) == user.id:
            return Address.objects.all()
        else:
            raise PermissionDenied({"message": 'You are authorized to access this address'})

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)