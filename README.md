# OOP Framework Practice

## Introduction

OOP Framework Practice is a lightweight and scalable micro-framework built on top of Express.js, inspired by Nest.js. It leverages modern TypeScript features such as decorators, metadata, and dependency injection to provide a structured and maintainable approach to web application development.

This project consists of three different application layers:

- **V1 (Traditional Layer):** A simple functional system following a traditional approach.
- **V2 (OOP-Based Layer):** Implements object-oriented programming principles, utilizing abstract layers to reduce duplicate code.
- **V3 (Advanced OOP Layer):** Leverages decorators, dependency injection, and middleware for a more modular and scalable architecture.

The **lib** directory contains core business logic for the framework, including database handling, decorators, and reusable components.

## Features

- **Dependency Injection**: Powered by Tsyringe for efficient dependency management.
- **Decorators and Metadata**: Define controllers, routes, and middleware with ease.
- **Middleware Support**: Apply middleware at both the controller and route levels.
- **Repository and Service Pattern**: Abstract classes to standardize database access and business logic.
- **Filter Builder**: A utility to construct and execute complex SQL queries efficiently.
- **Multi-Version Support**: Evolving architecture with three structured layers (V1, V2, and V3) for progressive learning and development.

## Project Structure

- **src**
  - **db**: Manages database connections, migrations, schemas, and seeding.
  - **learn**: Provides learning examples for decorators and dependency injection.
  - **lib**: Contains the core business logic of the framework.
  - **v1**: Traditional system with a simple functional structure.
  - **v2**: OOP-based system with abstract layers to minimize code duplication.
  - **v3**: Advanced architecture using decorators, dependency injection, and middleware.
  - **index.ts & registry.ts**: Entry point and component registration for the framework.

## Usage Examples

### Controller Example

```typescript
import { Controller, Get, Use } from './decorators';
import { Request, Response } from 'express';

@Controller('/api')
class UserController {
  @Get('/users')
  @Use(authMiddleware)
  getUsers(req: Request, res: Response) {
    res.send('Get Users');
  }
}
```

### Service Example

```typescript
import { BaseService } from './BaseService';
import { injectable } from 'tsyringe';
import { UsersTable } from '../database/tables';

@injectable()
export class UserService extends BaseService<
  typeof UsersTable,
  UserRepository
> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
}
```

### Repository Example

```typescript
import { UsersTable } from '@/db/schemas';
import { BaseRepository } from '@/lib/core/BaseRepository';
import { DatabaseClientToken, IDatabaseClient } from '@/lib/db/IDatabaseClient';
import { eq } from 'drizzle-orm';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UserRepository extends BaseRepository<typeof UsersTable> {
  constructor(@inject(DatabaseClientToken) db: IDatabaseClient) {
    super(db, UsersTable);
  }
}
```

## Code Reusability

This framework significantly reduces code duplication by leveraging base and abstract classes. Developers only need to specify the appropriate table and repository class, allowing for cleaner and more maintainable code.

## Conclusion

The OOP Framework Practice provides a structured, scalable, and efficient approach to building web applications with Express.js and TypeScript. By utilizing modern TypeScript features such as decorators, dependency injection, and abstract classes, this framework ensures a maintainable and modular architecture for web development.
