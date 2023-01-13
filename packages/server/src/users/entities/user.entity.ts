import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  AfterLoad,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  fullName: string;

  @AfterLoad()
  afterLoad() {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }
}
