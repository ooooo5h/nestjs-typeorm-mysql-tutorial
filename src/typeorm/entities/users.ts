import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './posts';
import { Profile } from './profile';

@Entity({ name: 'users' }) // DB에서 해당 클래스를 부를 이름 지정가능
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' }) // PK라고 정의함, auto generated
  id: number;

  @Column({ unique: true }) // 일반 컬럼
  username: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
