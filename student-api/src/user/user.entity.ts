// src/user/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Todo } from '../todos/todo.entity'; // Import Todo từ đúng path (không circular nữa)

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string; // Giả sử dùng 'full_name' thay vì 'name'

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' }) // <-- Thêm 'name: 'password_hash'' để map column DB, nhưng property là 'password' cho type
  password: string; // Property TS là 'password', DB column là 'password_hash'

  // Fix relation: Sử dụng arrow function để infer type đúng
  @OneToMany(() => Todo, (todo: Todo) => todo.user) // <-- Chỉ định type 'Todo' cho param để tránh 'unknown'
  todos: Todo[];
}
