docker run -d --name influxdb-service -p 8086:8086 \
  -v /home/xrazis/Documents/random_code/database/influx/:/var/lib/influxdb \
  influxdb
