from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _


class Address(models.Model):
    street_address = models.CharField('Main address details', max_length=255, blank=False, null=False)
    address_line_2 = models.CharField('Additional address details', max_length=255, blank=True, null=True)
    city = models.CharField('City name', max_length=255, blank=False, null=False)
    state = models.CharField('State name', max_length=255, blank=False, null=False)
    zip_code = models.IntegerField('Zip code', blank=False, null=False)
    phone_number = models.IntegerField('Additional Phone number', blank=True, null=True)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.IntegerField('Main Phone number', null=False, blank=False, unique=True)
    addresses = models.ManyToManyField(Address)


class Authors(models.Model):
    class Sex(models.TextChoices):
        MALE = 'M', _('Male')
        FEMALE = 'F', _('Female')
        OTHERS = 'O', _('Others')

    first_name = models.CharField('Author first name', max_length=255, blank=False, null=False)
    last_name = models.CharField('Author last name', max_length=255, blank=False, null=False)
    sex = models.CharField('Author gender', max_length=1, choices=Sex.choices, blank=False, null=False)
    dob = models.DateTimeField('Author date of birth', blank=True, null=True)
    photo = models.ImageField(upload_to='images/', default='images/None')
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='Created By +')
    last_modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='Last modified by +')
    created_at = models.DateTimeField('Record created information', auto_now_add=True)
    last_modified_at = models.DateTimeField('Record last updated information', auto_now=True)

    class Meta:
        unique_together = ('first_name', "last_name")


class Publishers(models.Model):
    name = models.CharField('Publisher name', max_length=255, unique=True)
    phone_number = models.IntegerField('Publisher phone number')
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='Created By +')
    last_modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='Last modified by +')
    created_at = models.DateTimeField('Record created information', auto_now_add=True)
    last_modified_at = models.DateTimeField('Record last updated information', auto_now=True)


class Books(models.Model):
    ISBN = models.CharField('Book ISBN', max_length=255, unique=True)
    title = models.CharField('Book title', max_length=255, blank=False, null=False)
    price = models.FloatField('Book price', blank=False, null=False)
    authors = models.ManyToManyField(Authors)
    image = models.ImageField(upload_to='images/', default='images/None')
    publisher = models.ForeignKey(Publishers, on_delete=models.CASCADE)
    stock = models.IntegerField('Stocks available', default=0)
    sold = models.IntegerField('Number of units sold', default=0)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='Created By +')
    last_modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='Last modified by +')
    created_at = models.DateTimeField('Record created information', auto_now_add=True)
    last_modified_at = models.DateTimeField('Record last updated information', auto_now=True)


class Cart(models.Model):
    book = models.ForeignKey(Books, on_delete=models.SET_NULL, null=True, related_name='book')
    count = models.IntegerField('Number of units ordered')
    price = models.FloatField('Price on each unit')


class Order(models.Model):
    class Status(models.TextChoices):
        RECEIVED = 'REC', _('Received')
        PROCESSING = 'PRO', _('Processing')
        SHIPPED = 'SHI', _('Shipped')
        DELIVERED = 'DEL', _('Delivered')
        CANCELLED = 'CAN', _('Cancelled')

    class PaymentMode(models.TextChoices):
        CASH_ON_DELIVERY = 'CASH_OD', _('Cash on delivery')
        CARD_ON_DELIVERY = 'CARD_OD', _('Card on delivery')
        PAY_ONLINE_ON_DELIVERY = 'PON_OD', _('Pay online on delivery')

    books = models.ManyToManyField(Cart)
    amount = models.FloatField('Total amount of order')
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    status = models.CharField('Order status', max_length=3, choices=Status.choices, blank=False, null=False, default='REC')
    payment_mode = models.CharField('Order payment mode', max_length=7, choices=PaymentMode.choices,
                                    blank=False, null=False, default='CASH_OD')
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='Created By +')
    last_modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='Last modified by +')
    created_at = models.DateTimeField('Record last updated information', auto_now_add=True)
    last_modified_at = models.DateTimeField('Record last updated information', auto_now=True)
