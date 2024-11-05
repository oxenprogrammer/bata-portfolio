<?php

/**
 * User Model
 *
 * This file contains the definition of the User model class.
 * The User model represents a user in the application and includes
 * attributes, relationships, and methods related to user data.
 *
 * @category Models
 * @package  App\Models
 * @version  1.0
 * @author   Kibooli Felix <kiboolif@gmail.com>
 * @license  MIT (https://opensource.org/licenses/MIT)
 * @link     https://github.com/KIBOOLI-FELIX/mribrahimsite.git
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * User Model class
 *
 * This class represents a user in the application.
 *
 * @category Models
 * @package  App\Models
 * @version  1.0
 * @author   Kibooli Felix <kiboolif@gmail.com>
 * @license  MIT (https://opensource.org/licenses/MIT)
 * @link     https://github.com/KIBOOLI-FELIX/mribrahimsite.git
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
        'first_name',
        'last_name',
        'email',
        'password',
        'biography',
        'skills',
        'name'
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
            'skills' => 'array',
        ];
    }
    /**
     * This function retrieves all blogs posted
     * by a specific user
     *
     * @return void
     */
    public function blogs()
    {
        return $this->hasMany(Blog::class);
    }
    /**
     * This function retrieves all documents uploaded by
     * a specific user
     *
     * @return void
     */
    public function documents()
    {
        return $this->hasMany(Document::class);
    }
    /**
     * This checks if the user is an admin
     *
     * @return boolean
     */
    public function canAccessFilament(): bool
    {
        return $this->is_admin;  // This will check if the user is an admin
    }
}
