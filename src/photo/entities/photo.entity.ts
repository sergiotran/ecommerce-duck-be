import { User } from './../../user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'photos',
})
export class Photo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: String,
    nullable: true,
    default: 'Untitled',
  })
  title: string;

  @Column()
  @ManyToOne(() => User, (user) => user.photos)
}
