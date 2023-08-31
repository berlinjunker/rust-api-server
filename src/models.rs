use diesel::prelude::*;
use serde::{Serialize, Deserialize};

#[derive(Queryable, Selectable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct User {
    pub id: i32,
    pub firstName: String,
    pub lastName: String,
    pub phone: String,
    pub email: String,
    pub address: String,
    pub postalZip: String,
    pub country: String,
}

#[derive(Insertable)]
#[diesel(table_name = crate::schema::users)]
pub struct NewUser<'a> {
    pub id: &'a i32,
    pub firstName: &'a str,
    pub lastName: &'a str,
    pub phone: &'a str,
    pub email: &'a str,
    pub address: &'a str,
    pub postalZip: &'a str,
    pub country: &'a str,
}