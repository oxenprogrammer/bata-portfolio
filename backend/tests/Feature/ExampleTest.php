<?php

/**
 * ExampleTest Class
 *
 * This file contains tests for basic application functionality.
 * It ensures that the application returns a successful response
 * for the root URL.
 *
 * @package Tests\Feature
 */

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * Test that the application returns a successful response.
     *
     * @return void
     */
    public function testApplicationReturnsSuccessfulResponse(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
