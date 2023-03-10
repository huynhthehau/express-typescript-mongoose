import { IsBoolean, IsEmpty, IsNumber, IsString, IsOptional } from "class-validator";

export class CreateCommentDto {
    @IsEmpty()
    public userId: string
    @IsEmpty()
    public postId: string
    @IsString()
    public content: string
    @IsOptional()
    @IsString()
    public inReplyToComment: string
    @IsOptional()
    @IsString()
    public inReplyToUser: string
}