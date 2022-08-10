import { Role } from './../../common/constants/enums/role.enum';
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
    nullable: false,
  })
  date_of_birth: string;

  @Column({
    type: String,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: String,
    select: false,
  })
  password: string;

  @Column({
    type: String,
    default: '#',
  })
  profile_image: string;

  @Column({
    default: Role.USER,
  })
  role: string;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}
