import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  code: string;          // mã học sinh

  @Column()
  full_name: string;

  @Column({ nullable: true })
  class_name?: string;

  @Column({ type: 'date', nullable: true })
  dob?: string;

  @CreateDateColumn()
  created_at: Date;
}