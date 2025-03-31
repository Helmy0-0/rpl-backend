import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UserLoginRequest,
UserLoginResponse,
  UserDetailResponse,
  UserUpdateRequest,
} from 'src/models/user.model';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/guards/jwt.guard';
import { DeleteResponse } from 'src/models/common.model';
import { ErrorResponse } from 'src/models/http-exception.model';
import { ValidationError } from 'src/models/custom-exception';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: UserLoginResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
    type: ValidationError,
  })
  @ApiResponse({
    status: 404,
    description: 'Email or password is incorrect',
    type: ErrorResponse,
  })
  async login(@Body() request: UserLoginRequest): Promise<UserLoginResponse> {
    return this.usersService.signIn(request);
  }

  @UseGuards(JwtGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Users successfully retrieved',
    type: [UserDetailResponse],
  })
  async findAll(): Promise<UserDetailResponse[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'User successfully found',
    type: UserDetailResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: ErrorResponse,
  })
  async findOne(@Param('id') id: string): Promise<UserDetailResponse> {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'User successfully updated',
    type: UserDetailResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: ErrorResponse,
  })
  async update(
    @Param('id') id: string,
    @Body() request: UserUpdateRequest,
  ): Promise<UserDetailResponse> {
    return this.usersService.update(id, request);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'User successfully deleted',
    type: DeleteResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: ErrorResponse,
  })
  async delete(@Param('id') id: string): Promise<DeleteResponse> {
    return this.usersService.delete(id);
  }
}
