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

fn main() {
    use rustApp::schema::users::dsl::*;

    let connection = &mut establish_connection();
    let results = users
        // .filter(firstName.eq("Zia"))
        // .limit(5)
        .select(User::as_select())
        .load(connection)
        .expect("Error loading users");

    println!("Displaying {} users", results.len());
    for user in results {
        println!("{}", user.firstName);
        println!("{}", user.lastName);
        println!("{}", user.address);
        println!("{}", user.country);
        println!("-----------\n");
    }
}

// -----------------------------------------------------------------------------------

// #[get("/")]
// async fn hello() -> impl Responder {
//     HttpResponse::Ok().body("
//             <h1>
//                 Hello World!
//             </h1>
//         ")
// }

// #[post("/echo")]
// async fn echo(req_body: String) -> impl Responder {
//     HttpResponse::Ok().body(req_body)
// }

// async fn manual_hello() -> impl Responder {
//     HttpResponse::Ok().body("Hey there!")
// }

// #[actix_web::main]
// async fn main() -> std::io::Result<()> {
//     HttpServer::new(|| {
//         App::new()
//             .service(hello)
//             .service(echo)
//             .route("/hey", web::get().to(manual_hello))
//     })
//     .bind(("127.0.0.1", 8080))?
//     .run()
//     .await
// }