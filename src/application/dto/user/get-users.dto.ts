import { IsNotEmpty } from "class-validator";

export class GetUsersDTO {
  @IsNotEmpty({ message: 'GET-USERS.ERRORS.EMPTY_LIMIT' })
  limit: number;

  @IsNotEmpty({ message: 'GET-USERS.ERRORS.EMPTY_OFFSET' })
  offset: number;

  id?: string;
  email?: string;
  name?: string;

  private constructor() {
  }

  static fromQueryParams(params: GetUsersDTO): Readonly<GetUsersDTO> {
    const instance = new GetUsersDTO();
    instance.limit = parseInt(params.limit.toString());
    instance.offset = parseInt(params.offset.toString());

    if (params.id) {
      instance.id = params.id;
    }

    if (params.email) {
      instance.email = params.email;
    }

    if (params.name) {
      instance.name = params.name;

    }

    return instance;
  }

  getFilters(): Readonly<Partial<GetUsersDTO>> {
    const filters: Partial<GetUsersDTO> = {};

    if (this.email) {
      filters.email = this.email;
    }

    if (this.name) {
      filters.name = this.name;
    }

    return filters;
  }
}
