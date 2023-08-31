use diesel::prelude::*;

#[derive(Queryable, Selectable)]
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