export class CreateUserDto {
  email: string;
  name?: string | null;
  dateOfBirth?: Date | null; // Optional date of birth
  avatar?: string | null; // Optional URL to the user's avatar
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  } | null;
}