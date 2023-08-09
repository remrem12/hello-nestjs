import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create.note.dto';
import { UpdateNoteDto } from './dto/update.note.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NoteService {
  constructor(private prismaService: PrismaService) {}
  async getNotes(userId: number) {
    const notes = await this.prismaService.note.findMany({
      where: {
        userId,
      },
    });
    return notes;
  }

  getNoteById(noteId: number) {
    return noteId;
  }
  async createNote(userId: number, createDto: CreateNoteDto) {
    const newNote = await this.prismaService.note.create({
      data: {
        ...createDto,
        userId,
      },
    });
    return newNote;
  }

  updateNote(noteId: number, updateDto: UpdateNoteDto) {}
  deleteNote(noteId: number) {}
}
