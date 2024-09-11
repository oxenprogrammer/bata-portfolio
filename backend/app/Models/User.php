<?php
/**
 * User Model
 *
 * This file contains the definition of the User model class.
 * The User model represents a user in the application and includes
 * attributes, relationships, and methods related to user data.
 *
 * @package App\Models
 * @category Models
 * @version PHP 8.2
 * @author Kibooli Felix
 * @license MIT
 * @link [URL] (if applicable)
 */
namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * The User class represents a user in the application.
 *
 * @package App\Models
 * @category Models
 * @version PHP 8.2
 * @author Kibooli Felix
 * @license MIT
 * @link [URL] (if applicable)
 */
class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
