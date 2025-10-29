// src/todos/todo.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity'; // Import User từ đúng path

@Entity()
export class Todo {
  // <-- Thêm 'export' để các file khác import được
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.todos) // Giữ nguyên, sẽ khớp sau khi sửa User
  user: User;
}
