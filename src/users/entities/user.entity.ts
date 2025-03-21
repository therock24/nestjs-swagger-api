import { ApiHideProperty } from '@nestjs/swagger';

export class User {
  id: string; // Unique identifier for the user
  name?: string | null;
  email: string;
  dateOfBirth?: Date | null; // Optional date of birth
  avatar?: string | null; // Optional URL to the user's avatar
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  } | null; // Optional address object
  createdAt: Date; // Timestamp for when the user was created
  updatedAt: Date; // Timestamp for when the user was last updated
}
