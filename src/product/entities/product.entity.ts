import { Photo } from './../../photo/entities/photo.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: String,
    nullable: false,
  })
  name: string;

  @Column({
    type: Number,
    nullable: false,
  })
  quantity: number;

  @Column()
  @OneToOne(() => Photo)
  @JoinColumn()
  thumbnail: Photo;

  @Column:
}
