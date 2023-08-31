use actix_web::web::Json;
use diesel::{PgConnection, SelectableHelper, RunQueryDsl};
use models::User;

use crate::models::NewUser;

pub mod models;
pub mod schema;

pub fn create_user_in_db(conn: &mut PgConnection, user: Json<User>) -> User {
  use crate::schema::users;

  let new_user = NewUser { 
    id: &user.id,
    firstName: &user.firstName,
    lastName: &user.lastName,
    phone: &user.phone,
    email: &user.email,
    address: &user.address,
    postalZip: &user.postalZip,
    country: &user.country,
   };

  diesel::insert_into(users::table)
      .values(&new_user)
      .returning(User::as_returning())
      .get_result(conn)
      .expect("Error saving new user")
}