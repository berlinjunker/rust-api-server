use actix_files as fs;
use actix_web::{App, HttpServer, Responder, HttpResponse, get, post, delete, patch, web, Result, HttpRequest};
use actix_files::NamedFile;
use rustApp::{models::*, create_user_in_db, schema::users::firstName};
use diesel::prelude::*;
use dotenvy::dotenv;
use std::{env, path::PathBuf};
use diesel::pg::PgConnection;

pub fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

// #[get("/")]
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
async fn create_user(req_body: web::Json<User>) -> Result<String> {
    let connection = &mut establish_connection();
    let user = create_user_in_db(connection, req_body);
    return Ok(String::from(format!("Created user, Welcome {}", user.firstName)));
}

#[delete("/{id_to_delete}")]
async fn delete_user(path: web::Path<i32>) -> impl Responder {
    use rustApp::schema::users::dsl::*;
    let connection = &mut establish_connection();

    let id_to_delete = path.into_inner();

    diesel::delete(users.find(id_to_delete))
        .execute(connection)
        .expect("Error deleting users");
    HttpResponse::Ok().body("delete user")
}

#[patch("/{id}")]
async fn update_user(path: web::Path<i32>) -> Result<String> {
    let id = path.into_inner();

    use rustApp::schema::users::dsl::users;

    let connection = &mut establish_connection();

    let post = diesel::update(users.find(id))
        .set(firstName.eq("Klaus"))
        .returning(User::as_returning())
        .get_result(connection)
        .unwrap();

    Ok(format!("Updated user_id {}!", post.id))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // HttpServer::new(|| {
    //     App::new()
    //         .service(get_users)
    //         .service(create_user)
    //         .service(delete_user)
    //         .service(update_user)
    //         // .route("/hey", web::get().to(manual_hello))
    // })
    // .bind(("127.0.0.1", 8080))?
    // .run()
    // .await

    HttpServer::new(|| {
        App::new()
            .route("/user", web::get().to(get_users))
            .service(
            fs::Files::new("/", "./www")
                .show_files_listing()
                .index_file("index.html")
                .use_last_modified(true),
        )
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}