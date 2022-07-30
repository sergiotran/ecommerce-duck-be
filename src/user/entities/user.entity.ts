import { Product } from './../../product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: String,
    nullable: false,
  })
  first_name: string;

  @Column({
    type: String,
    nullable: false,
  })
  last_name: string;

  @Column({
    type: String,
    nullable: false,
  })
  phone_number: string;

  @Column({
    type: String,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: String,
  })
  password: string;

  @Column({
    type: String,
    nullable: true,
  })
  profile_image: string;

  @Column()
  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}
