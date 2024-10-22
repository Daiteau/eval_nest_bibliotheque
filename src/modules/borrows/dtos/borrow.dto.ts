import {
    IsDefined,
    IsUrl,
  } from "class-validator";

export class CreateBorrowDto{  
    @IsDefined()
    user_id: number;
  
    @IsDefined()
    @IsUrl()
    book_id: number;
  
    @IsDefined()
    borrowed_at: Date;

    @IsDefined()
    returned_at: Date | null;
  }