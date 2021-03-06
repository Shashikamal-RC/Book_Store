from django.conf.urls import url
from .views import BookListViewSet, BookDetailViewSet, AuthorListViewSet, AuthorDetailViewSet, UserProfileListViewSet, \
    UserProfileDetailViewSet, OrderListViewSet, OrderDetailViewSet, PublisherListViewSet, PublisherDetailViewSet, \
    AddressDetailViewSet

urlpatterns = [
    url(r'^books/$', BookListViewSet.as_view()),
    url(r'^books/(?P<pk>\d+)/$', BookDetailViewSet.as_view()),
    url(r'^userprofile/$', UserProfileListViewSet.as_view()),
    url(r'^userprofile/(?P<pk>\d+)/$', UserProfileDetailViewSet.as_view()),
    url(r'^author/$', AuthorListViewSet.as_view()),
    url(r'^author/(?P<pk>\d+)/$', AuthorDetailViewSet.as_view()),
    url(r'^publisher/$', PublisherListViewSet.as_view()),
    url(r'^publisher/(?P<pk>\d+)/$', PublisherDetailViewSet.as_view()),
    url(r'^user/(?P<user>\w+)/order/$', OrderListViewSet.as_view()),
    url(r'^user/(?P<user>\w+)/order/(?P<pk>\d+)/$', OrderDetailViewSet.as_view()),
    url(r'^user/(?P<user>\w+)/address/(?P<pk>\d+)/$', AddressDetailViewSet.as_view())
]
