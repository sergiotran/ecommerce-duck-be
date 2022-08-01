import { User } from './../../user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
    unique: true,
  })
  slug: string;

  @Column({
    default: true,
  })
  out_of_stock: boolean;

  @Column({
    default: true,
  })
  enabled: boolean;

  @Column({
    nullable: false,
  })
  price: number;

  @Column({
    default: '#',
  })
  featured_image: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.products)
  user: User;
}
