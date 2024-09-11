<?php

/**
 * ExampleTest Class
 *
 * This file contains tests for basic application functionality.
 * It ensures that the application returns a successful response
 * for the root URL.
 *
 * @package Tests\Feature
 * @category Tests
 * @version PHP 8.2
 * @author Kibooli Felix
 * @license MIT
 * @link [URL]
 */

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * This class contains tests for verifying basic functionality of the application.
 * It extends the base TestCase class to utilize testing features provided by
 * Laravel.
 */
class ExampleTest extends TestCase
{
    /**
     * Test that the application returns a successful response for the root URL.
     *
     * This test sends a GET request to the root URL of the application and asserts
     * that the response status is 200, indicating a successful response.
     *
     * @return void
     */
    public function testApplicationReturnsSuccessfulResponse(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
