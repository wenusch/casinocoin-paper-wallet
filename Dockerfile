FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY src /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]