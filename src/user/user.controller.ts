import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Headers,
  Param,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CrudeService } from './crude.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dtos';
import { LogInterceptor } from 'src/Interceptors/log.incerptor';
import { ParamId } from 'src/decorators/param-id.decorator';

//Api para Crude

//Definicao de nossa rota para /users
@Controller('users')
export class UserController {
  //Constructor para recebermos nossas funcoes do Services
  constructor(private readonly crude: CrudeService) {}

  //Utilziando interceptador LogInterceptor para conseguir medir o tempo na criacao do usuario
  @UseInterceptors(LogInterceptor)
  //Post para criacao de um usuario rota POST: /users
  @Post()
  //Usando DTO para a validacao das requests
  async create(@Body() body: CreateUserDTO) {
    return await this.crude.createUser(body);
  }

  //Get para receber todos os usuarios GET: /users
  @Get()
  async read() {
    return await this.crude.listAll();
  }

  //GET para receber um usuario em especifico GET: /users/:id
  @Get(':id')
  async readOne(@ParamId() id) {
    return await this.crude.readOne(id);
  }

  //Update Particial

  //PATCH para fazer um update parcial PATCH: /users/:id
  @Patch(':id')
  async updateOne(@Body() body: UpdateUserDTO, @ParamId() id) {
    return await this.crude.updateOne(id, body);
  }

  //Delete para remover um usuario do banco de dados DELETE: /users/:id

  @Delete(':id')
  async deleteOne(@ParamId() id) {
    return await this.crude.deleteOne(id);
  }
}
