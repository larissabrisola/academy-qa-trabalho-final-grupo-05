import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import LoginPage from "../pages/login.page";
import MovieDetailsPage from "../pages/movieDetails.page";

const movieDetails = new MovieDetailsPage()