diesel::table! {
  users (id) {
      id -> Int4,
      firstName -> Text,
      lastName -> Text,
      phone -> Text,
      email -> Text,
      address -> Text,
      postalZip -> Text,
      country -> Text,
  }
}