create table if not exists items (
  id serial primary key,
  title varchar(255) not null,
  details text,
  status varchar(50),
  created_at timestamp,
  updated_at timestamp
);
