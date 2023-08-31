use actix_web::{App, HttpServer, Responder, HttpResponse, get, post, delete, patch};
use rustApp::models::*;
use diesel::prelude::*;
use dotenvy::dotenv;
use std::env;
use diesel::pg::PgConnection;

pub fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

#[get("/")]
async fn get_users() -> impl Responder {
    use rustApp::schema::users::dsl::*;

    let connection = &mut establish_connection();
    let results = users
        // .filter(firstName.eq("Zia"))
        // .limit(5)
        .select(User::as_select())
        .load(connection)
        .expect("Error loading users");

    return HttpResponse::Ok().json(results);
}

#[post("/")]
async fn create_user(req_body: String) -> impl Responder {
    HttpResponse::Ok().body("create user")
}

#[delete("/")]
async fn delete_user(id: String) -> impl Responder {
    HttpResponse::Ok().body("delete user")
}

#[patch("/")]
async fn update_user(id: String) -> impl Responder {
    HttpResponse::Ok().body("update user")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(get_users)
            .service(create_user)
            .service(delete_user)
            .service(update_user)
            // .route("/hey", web::get().to(manual_hello))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}