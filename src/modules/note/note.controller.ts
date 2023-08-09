import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateNoteDto } from './dto/create.note.dto';
import { NoteService } from './note.service';
import { UpdateNoteDto } from './dto/update.note.dto';

@Controller('notes')
@UseGuards(AuthGuard('jwt'))
export class NoteController {
  constructor(private noteService: NoteService) {}
  @Get()
  getNotes(@Req() request: Request) {
    const userId = request?.user?.id;
    return this.noteService.getNotes(userId);
  }

  @Get(':id')
  getNoteById(@Param('id') noteId: number) {
    return this.noteService.getNoteById(noteId);
  }

  @Post()
  createNote(@Req() request: Request, @Body() createDto: CreateNoteDto) {
    const userId = request?.user?.id;
    return this.noteService.createNote(userId, createDto);
  }

  @Patch(':id')
  updateNote(
    @Param('id', ParseIntPipe) noteId: number,
    @Body() updateDto: UpdateNoteDto,
  ) {
    return this.noteService.updateNote(noteId, updateDto);
  }

  @Delete(':id')
  deleteNote(@Param('id') noteId: number) {
    return this.noteService.deleteNote(noteId);
  }
}
