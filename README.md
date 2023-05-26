# Pawsense
This app is for helping pet parents better track their pets' behavior, mood and health, find solutions to any existing problems so their pets can live their best life.

## Table of Contents

- [Approach](#approach)
- [Features and Functionality](#features)
- [Stack](#stack)
- [Diagrams](#diagrams)

<a name="approach"></a>

## Approach
Since animals cannot communicate the way that we can, it is important for pet parents to regularly keep track of their pets behavior, mood and any other changes that could point to health problems. By the time something serious happens and a pet is taken to the vet, sometimes it is too late and your pet has to have invasive surgery or worse.

Users will have the ability to track their pets behavior, mood and more so that they can better detect these serious illnesses later on before it's too late.

<a name="features"></a>

## Features and Functionality:
Once a user is authenticated, they are directed to a page on the app that shows them an overview of the pets in their household. They can do the following:

- Add new pet to household
- Edit pet's details
- Access pet's details
- Archive a pet that is no longer apart of household
- Log pet's daily activities, behaviors, moods and more.

<a name="stack"></a>

## Stack
The frontend and backend are separate from each other since both have different programming languages and frameworks.

### Frontend
- Next.js (client)
- Tailwind.css(styling)
- Cypress(e2e testing)

### Backend
- Spring Boot (server)
- MySQL (database)
- JUnit (unit testing)

### Auth
- Auth0

<a name="diagrams"></a>

## Diagrams

### New User Registration
```mermaid
flowchart TD
  A((User)) -->|Selects Registration button| B(AuthO Form)
  B -->|User fills out form| C{Data validated?}
  C -->|Yes| D(Save Data to MySQL)
  D --> E(Redirect to Main Activity Screen)
  C -->|No| B
```

### Get Pet Details
```mermaid
graph LR
  A((User)) -->|Clicks on a pet| B(Redirect to Pet Details Page)
  B --> C(Retrieve Pet Details from Server)
  C --> D(Show Pet Details)
```

### Add new pet to household
```mermaid
graph LR
  A((User)) -->|Adds new Pet| B(Create Pet)
  B -->|User selects photo| C(Upload Photo to S3)
  C --> D{Photo saved?}
  D -->|Yes| E(Update MySQL with photo reference)
  D -->|No| C
```

### Edit Pet Details
```mermaid
flowchart TD
  A((User)) -->|Selects pet from log| B(Choose 'Edit' button)
  B -->|Choose to update photo| C{Previous photo exists?}
  C -->|Yes| D(Remove previous photo from S3)
  D --> E(Upload new photo to S3)
  E --> F(Update reference in MySQL)
  C -->|No| E
  B --> F
```

### Pet removed from household
```mermaid
graph LR
  A((User)) -->|Chooses to remove pet| B(Remove Pet from Log)
  B --> C{Photo exists?}
  C -->|Yes| D(Remove Photo from S3)
  D --> E(Delete Row from MySQL Table)
  C -->|No| E
```
